function checkCount()
{
    let subject = document.getElementById('subject').value;

    let count = document.getElementById('count');
    const words = subject.trim().split(" ");

    if (words.filter((count) => count !== "").length > 500) {
        alert("Words exceeded");
        return false;
    }

    count.innerHTML = words.filter((count) => count !== "").length;
}