document.addEventListener("DOMContentLoaded", function() {

    // ================= SIDEBAR =================

    const menuBtn = document.getElementById("menuBtn");
    const closeBtn = document.getElementById("closeBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const menuItems = document.querySelectorAll(".menu-item");

    if(menuBtn){
        menuBtn.addEventListener("click", () => {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        });
    }

    if(closeBtn){
        closeBtn.addEventListener("click", closeSidebar);
    }

    if(overlay){
        overlay.addEventListener("click", closeSidebar);
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    menuItems.forEach(item => {
        item.addEventListener("click", function(e) {
            const target = this.getAttribute("href");

            if(target.startsWith("#")) {
                e.preventDefault();
                document.querySelector(target)
                    .scrollIntoView({ behavior: "smooth" });
            }

            closeSidebar();
        });
    });

    // ================= EMAILJS =================

    emailjs.init("xIBONwKlXh-GVQvP6");   // Your public key

    const form = document.getElementById("contact-form");

    if(form){
        form.addEventListener("submit", function(event) {

            event.preventDefault();

            emailjs.sendForm(
                "service_z1nvj34",
                "template_5wmdzzx",
                this
            )
            .then(function() {
                alert("Message sent successfully!");
                form.reset();
            })
            .catch(function(error) {
                console.log("FAILED...", error);
                alert("Failed to send message.");
            });

        });
    }

});