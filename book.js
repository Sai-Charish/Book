let currentPage = -1; // start before first page

document.addEventListener("DOMContentLoaded", () => {
    const book = document.querySelector(".book");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const pages = document.querySelectorAll(".paper");
    const extra = document.getElementById("extra");

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
        if (index === -1) {
            extra.classList.remove("hide");
        } else {
            extra.classList.add("hide");
        }
    }

    window.nextPage = function () {
        book.classList.add("open");

        if (currentPage < pages.length - 1) {
            currentPage++;
            showPage(currentPage);
            showExtra(currentPage);
        }

        // Show prev button if not at start
        if (currentPage >= 0) {
            prevBtn.classList.add("show");
        }

        // Hide next button at last page
        if (currentPage === pages.length - 1) {
            nextBtn.classList.remove("show");
        }
    };

    window.prevPage = function () {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            showExtra(currentPage);
        } else {
            // back to start
            currentPage = -1;
            pages.forEach(p => p.classList.remove("active"));
            prevBtn.classList.remove("show");
            book.classList.remove("open");
            showExtra(currentPage); // reset extra
        }

        // Show next button again if not last
        if (currentPage < pages.length - 1) {
            nextBtn.classList.add("show");
        }
    };

    // Initial extra state
    showExtra(currentPage);
});
