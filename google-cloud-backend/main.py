import requests
import random

def parse_json_for_articles(json):
    pages = json.get("query").get("pages")
    articles = []
    for current_page in pages:
        article = {}
        page = pages.get(current_page)

        #if page.get("extract"):
        extract = page.get("extract", "")
        article["extract"] = extract

        '''
        if page.get("links"):
            links = []
            for link in page.get("links"):
                link_title = link.get("title")
                links.append(link_title)
            article["links"] = links
        '''
        
        title = page.get("title")
        url = page.get("fullurl")
        id = page.get("pageid")

        article["title"] = title
        article["url"] = url
        article["id"] = id
        articles.append(article)

    #print(articles)
    # Removes the two articles which have the shortest lengths
    articles = sorted(articles, key=lambda k: len(k.get('extract')), reverse=True)
    if len(articles) > 8:
        articles.pop()
    if len(articles) > 8:
        articles.pop()

    random.shuffle(articles)
    return articles




def main(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    request_json = request.get_json()
    
    if request.args and 'id' in request.args:
        id = request.args.get("id")

        wiki_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&list=&continue=&pageids="+str(id)+"&plnamespace=0&pllimit=max"
        res = requests.get(wiki_url).json()
        pages = res.get("query").get("pages")
        page = pages.get(str(id))
        if page:
            links = page.get('links')
            titles = []
            if links:
                for link in links:
                    title = link.get("title")
                    titles.append(title)



            if len(titles):
                random.shuffle(titles)
                cat_string = "%7C".join(titles[:10])
                search_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&list=&titles="+cat_string+"&redirects=1&exlimit=max&exintro=1&explaintext=1&inprop=url%7Cdisplaytitle"
                search_res = requests.get(search_url).json()

                articles = parse_json_for_articles(search_res)
                return {"articles": articles}
            else: {"articles": [{"title": "No articles found", "extract": "Click the start over button to try again"}]}
        else:
            return {"articles": [{"title": "No articles found", "extract": "Click the start over button to try again"}]}

    else:
        wiki_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Clinks%7Cinfo&generator=random&redirects=1&exlimit=max&exintro=1&explaintext=1&exsectionformat=plain&excontinue=1&plnamespace=0&pllimit=500&inprop=url%7Cdisplaytitle&intestactions=&grnnamespace=0&grnfilterredir=nonredirects&grnlimit=10"
        res = requests.get(wiki_url).json()
        articles = parse_json_for_articles(res)

        return {"articles": articles}
    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        #return f'Hello World!'
        return request.args

