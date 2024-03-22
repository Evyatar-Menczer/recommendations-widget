const loadMoreItems = () => {
  console.log("Loading more items");
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

observer.observe(document.getElementById("loading-indicator"));
