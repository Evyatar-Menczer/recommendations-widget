export const createObserver = (appendToElement) => {
    const loadMoreItems = () => {
        const event = new CustomEvent("loadMoreItems", {
            bubbles: true,
            composed: true,
        });
        appendToElement.dispatchEvent(event);
    };

    let observer = new IntersectionObserver(
        (entries, _) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadMoreItems();
                }
            });
        },
        { threshold: 1.0 }
    );

    const loadingIndicator = document.createElement("div");
    loadingIndicator.id = "loading-indicator";
    appendToElement.appendChild(loadingIndicator);
    observer.observe(loadingIndicator);
};
