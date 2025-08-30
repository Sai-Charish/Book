let currentPage = -1; // start before first page
let afterLast = false; // flag to track extra next after last page
let defaultTitle = ""; // to remember the original title before last

document.addEventListener("DOMContentLoaded", () => {
    const book = document.querySelector(".book");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const pages = document.querySelectorAll(".paper");
    const extra = document.getElementById("extra");
    const headerTitle = document.querySelector(".title"); // header title element

    // Store original title text
    defaultTitle = headerTitle.textContent;

    // Initially only Next visible
    prevBtn.classList.remove("show");
    nextBtn.classList.add("show");

    function showPage(index) {
        pages.forEach((p, i) => {
            if (i === index) {
                p.classList.add("active");
            } else {
                p.classList.remove("active");
            }
        });
    }

    function showExtra(index) {
        if (index === -1 ) {
            extra.classList.remove("hide");
        } else {
            extra.classList.add("hide");
        }
    }

    function updateTitle(text) {
        // headerTitle.classList.add("fade-out");
        // setTimeout(() => {
            headerTitle.textContent = text;
        //     headerTitle.classList.remove("fade-out");
        //     headerTitle.classList.add("fade-in");
        // }, 500);
    }

    window.nextPage = function () {
        // If we are after last page → reload on next click
        if (afterLast) {
            window.location.reload();
            return;
        }

        book.classList.add("open");

        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
            showExtra(currentPage);
        } 
        else if (currentPage === pages.length - 1) {
            // We are on the last page → reset to header
            pages.forEach(p => p.classList.remove("active")); 
            book.classList.remove("open"); 
            currentPage = -1; 
            afterLast = true; // next click will reload

            // update header text (only at final)
            updateTitle("All the best Sindhu ,\n Love You.");
            headerTitle.classList.add("title-new"); // add farewell class

            // keep prev visible so user can go back
            prevBtn.classList.add("show");
            // showExtra(currentPage);
        }

        // Show prev button if not at very beginning
        if (currentPage >= 0 || afterLast) {
            prevBtn.classList.add("show");
        } else {
            prevBtn.classList.remove("show");
        }
    };

    window.prevPage = function () {
        // If afterLast (reset header), go back to last page first
        if (afterLast) {
            afterLast = false;
            currentPage = pages.length - 1; 
            showPage(currentPage);
            showExtra(currentPage);
            book.classList.add("open");

            // restore original title when leaving the final state
            updateTitle(defaultTitle);
            headerTitle.classList.remove("title-new"); // remove farewell class
            return;
        }

        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            showExtra(currentPage);
        } else {
            // back to start
            currentPage = -1;
            pages.forEach(p => p.classList.remove("active"));
            book.classList.remove("open");
            prevBtn.classList.remove("show"); // hidden only at very beginning
            showExtra(currentPage);
        }

        // Next always visible when going back
        nextBtn.classList.add("show");
    };

    // Initial extra state
    showExtra(currentPage);
});
