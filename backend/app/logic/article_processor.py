import trafilatura
from backend.app.clarifyLogger import log_report as report
import logging


def process_article(url:str) -> str:
    """
    Extracts text from a given url

    Args:
        url: URL to text

    Returns:
        extracted text
    """
    try:
        article = trafilatura.fetch_url(url) #downloads html content
        if article:
            extracted_text = trafilatura.extract(article) # Extracts text from article
            if not extracted_text:
                report(message="No text extracted") 
            else:
                return article
        else: # If downloading the html content fails...
            report(
                message = f"Failed to access the URL :{url}",
                level=logging.ERROR
                )
    except Exception as e: # If an unknown error occurs
        report(
            message = f"An error occurred: {e}",
            level = logging.ERROR
            )