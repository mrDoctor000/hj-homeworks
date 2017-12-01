'use strict';

function showComments(list) {
  list.forEach(createComment);
}

function createComment(comment) {
  const commentWrap = document.createElement('div');
  commentWrap.className = 'comment-wrap';
  const photo = document.createElement('div');
  photo.className = 'photo';
  photo.setAttribute('title', comment.author.name);
  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.style.backgroundImage = `url('${comment.author.pic}')`;
  const commentBlock = document.createElement('div');
  commentBlock.className = 'comment-block';
  const commentText = document.createElement('p');
  commentText.className = 'comment-text';
  commentText.textContent = comment.text.split('\n').join('<br>');
  const bottomComment = document.createElement('div');
  bottomComment.className = 'bottom-comment';
  const commentDate = document.createElement('div');
  commentDate.className = 'comment-date';
  commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');
  const commentActions = document.createElement('ul');
  commentActions.className = 'comment-action';
  const complain = document.createElement('li');
  complain.className = 'complain';
  complain.textContent = 'Пожаловаться';
  const reply = document.createElement('li');
  reply.className = 'reply';
  reply.textContent = 'Пожаловаться';

  commentActions.appendChild(complain);
  commentActions.appendChild(reply);

  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions)

  photo.appendChild(avatar);
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);

  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);

  const commentsContainer = document.querySelector('.comments');
  commentsContainer.appendChild(commentWrap);
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);