from backend.app.logic.main_extractor import retrieve_and_summarize
def generate_explanation(topic):
    summary, result, sources = retrieve_and_summarize(topic)
    return summary, result, sources