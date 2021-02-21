import requests

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
    
    if request.args:
        return {"error": "not implemented yet"}
    else:
        wiki_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Clinks%7Cinfo&generator=random&redirects=1&exlimit=max&exintro=1&explaintext=1&exsectionformat=plain&excontinue=1&plnamespace=0&pllimit=500&inprop=url%7Cdisplaytitle&intestactions=&grnnamespace=0&grnfilterredir=nonredirects&grnlimit=10"
        res = requests.get(wiki_url).json()
        pages = res.get("query").get("pages")
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
        articles.pop()
        articles.pop()

        return {"articles": articles}
    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        #return f'Hello World!'
        return request.args

main("qwe")
