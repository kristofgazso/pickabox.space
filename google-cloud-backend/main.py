import requests
import random

# This function is hosted on Google Cloud Functions, callable through 
# https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space

# If you want to query for articles related to a specific article through links, call
# https://us-central1-sachacks-305315.cloudfunctions.net/pickabox-space?id=ID_OF_ARTICLE

def parse_json_for_articles(json):
    pages = json.get("query").get("pages")
    articles = []

    # Parse the json given by Wikipedia and transform it for our use
    for current_page in pages:
        article = {}
        page = pages.get(current_page)

        extract = page.get("extract", "")
        article["extract"] = extract
        
        title = page.get("title")
        url = page.get("fullurl")
        id = page.get("pageid")

        article["title"] = title
        article["url"] = url
        article["id"] = id
        articles.append(article)


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

    # If the user queries for articles related to the one they clicked
    if request.args and 'id' in request.args:
        id = request.args.get("id")

        # Get the links that are included in the article that is queried
        wiki_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&list=&continue=&pageids="+str(id)+"&plnamespace=0&pllimit=max"
        res = requests.get(wiki_url).json()
        pages = res.get("query").get("pages")
        page = pages.get(str(id))
        if page:
            links = page.get('links')

            # Get title of the articles whose links were queried
            titles = []
            if links:
                for link in links:
                    title = link.get("title")
                    titles.append(title)

            # Get the articles for each title that we have listed if there is any
            if len(titles):
                # Make selection random
                random.shuffle(titles)
                cat_string = "%7C".join(titles[:10])
                search_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&list=&titles="+cat_string+"&redirects=1&exlimit=max&exintro=1&explaintext=1&inprop=url"
                search_res = requests.get(search_url).json()

                articles = parse_json_for_articles(search_res)
                return {"articles": articles}
            else: {"articles": [{"title": "No articles found", "extract": "Click the start over button to try again"}]}
        else:
            return {"articles": [{"title": "No articles found", "extract": "Click the start over button to try again"}]}

    # If they query for random articles
    else:
        # Get 10 random articles, including the introductory extract, urls, titles
        wiki_url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&generator=random&redirects=1&exlimit=max&exintro=1&explaintext=1&exsectionformat=plain&excontinue=1&inprop=url&intestactions=&grnnamespace=0&grnfilterredir=nonredirects&grnlimit=10"
        res = requests.get(wiki_url).json()
        articles = parse_json_for_articles(res)
        return {"articles": articles}

