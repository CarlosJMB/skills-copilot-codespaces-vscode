//create a new web page
function addComment() {
    var comment = document.getElementById("comment").value;
    var newComment = document.createElement("div");
    newComment.innerText = comment;
    document.getElementById("comments").appendChild(newComment);
    document.getElementById("comment").value = "";
}

document.getElementById("add-comment").addEventListener("click", addComment);
