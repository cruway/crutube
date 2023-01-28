const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
let deleteBtns = document.querySelectorAll(".button__delete");
let commentCount = document.getElementById("count-comment");
let commentLength = document.querySelectorAll(".video__comment").length;
const editBtns = document.querySelectorAll(".button__edit");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");

    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";

    const icon = document.createElement("i");
    icon.className = "fas fa-comment";

    const commentTextArea = document.createElement("div");
    commentTextArea.classList = "comment__text";

    const span = document.createElement("span");
    span.innerText = ` ${text}`;

    const newControls = document.createElement("div");
    newControls.className = "comment__controls";

    const editBtn = document.createElement("span");
    editBtn.className = "button__edit";
    editBtn.innerText = " ✏️";

    const delBtn = document.createElement("span");
    delBtn.className = "button__delete";
    delBtn.innerText = " ❌";

    newControls.appendChild(editBtn);
    newControls.appendChild(delBtn);
    commentTextArea.appendChild(span);
    newComment.appendChild(icon);
    newComment.appendChild(commentTextArea);
    newComment.appendChild(newControls);
    videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({text}),
    });
    if (response.status === 201) {
        textarea.value = "";
        const {newCommentId} = await response.json();
        addComment(text, newCommentId);
        const deleteBtn = document.querySelector(".button__delete");
        deleteBtn.removeEventListener("click", handleDelete);
        deleteBtn.addEventListener("click", handleDelete);
        commentLength = document.querySelectorAll(".video__comment").length;
        commentCount.innerText = `コメント ${commentLength}個`;
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}

const handleDelete = async (event) => {
    const path = (event.composedPath && event.composedPath()) || event.path;
    const parentList = path[2];
    const commentId = parentList.dataset.id;
    const response = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE",
    });
    if (response.status === 403) {
        alert("Incorrect User");
        return;
    }
    if (response.status === 200) {
        parentList.remove();
        commentLength = document.querySelectorAll(".video__comment").length;
        commentCount.innerText = `コメント ${commentLength}個`;
    }
};

if (deleteBtns) {
    deleteBtns.forEach(
        (
            deleteBtn
        ) => deleteBtn.addEventListener("click", handleDelete)
    );
}

const handleEdit = async (event) => {
    const path = (event.composedPath && event.composedPath()) || event.path;
    const commentText = path[2].children[1];
    const text = commentText.innerText;
    const commentId = path[2].dataset.id;
    const response = await fetch(`/api/videos/${commentId}/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text})
    });
    if (response.status === 403) {
        alert("Incorrect User");
        return;
    }
    if (response.status === 200) {
        commentText.classList.remove("edit-line");
        commentText.contentEditable = false;
        event.target.innerText = " ✏️";
        event.target.removeEventListener("click", handleEdit());
        event.target.addEventListener("click", handleEditBtn);
    }
};

const handleEditBtn = (event) => {
    const path = (event.composedPath && event.composedPath()) || event.path;
    const commentText = path[2].children[1];
    commentText.classList.add("edit-line");
    commentText.contentEditable = true;
    event.target.innerText = " ✅";
    event.target.removeEventListener("click", handleEditBtn);
    event.target.addEventListener("click", handleEdit);
};

editBtns.forEach((editBtn) => editBtn.addEventListener("click", handleEditBtn));