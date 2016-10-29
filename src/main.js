import emojiList from './emojiList';

class randomShipit {
  constructor() {
    this.button = {
      node: document.createElement('button'),
      text: 'Random'
    };
    this.selectors = {
      commentFormFooter: '#partial-new-comment-form-actions',
      commentForm: '.js-new-comment-form',
      commentField: '#new_comment_field',
      ajaxLoader: '#js-pjax-loader-bar'
    };
    this.classList = {
      button: ['btn', 'js-random-shipit']
    };

    this.init = this.init.bind(this);

    this.init();
  }

  init() {
    this.selectorObjects = {
      commentFormFooter: this.query(this.selectors.commentFormFooter),
      commentForm: this.query(this.selectors.commentForm),
      commentField: this.query(this.selectors.commentField),
      ajaxLoader: this.query(this.selectors.ajaxLoader)
    };
    this.removeButton();
    this.createButton();
  }

  query(element) {
    return document.querySelector(element);
  }

  isDecember() {
    return new Date().getMonth() === 11;
  }

  addClass(element, classList) {
    return element.classList.add.apply(
      element.classList,
      classList
    );
  }

  createButton() {
    this.addClass(this.button.node, this.classList.button);
    this.button.node.innerText = this.button.text;

    let image = document.createElement('img');
    image.src = chrome.extension.getURL(`images/${this.isDecember() ? 'xmas':'normal'}/38x38.png`);

    this.button.node.appendChild(image);

    if (this.appendButton()) {
      this.bindEvents();
    }
  }

  removeButton() {
    let button = this.query('.' + this.classList.button.join('.'));
    if (button) {
      button.remove();
    }
  }

  appendButton() {
    return this.selectorObjects.commentFormFooter ?
      this.selectorObjects.commentFormFooter.appendChild(this.button.node) :
      false
    ;
  }

  bindEvents() {
    this.button.node.onclick = e => this.clickFunction(e);

    var observer = new window.MutationObserver(() => setTimeout(this.init, 100));

      // define what element should be observed by the observer
        // and what types of mutations trigger the callback
    observer.observe(this.selectorObjects.ajaxLoader, {
        subtree: false,
        attributes: true
    });
  }

  getRandomEmoji() {
    return emojiList[Math.floor(Math.random() * emojiList.length)];
  }

  clickFunction(e) {
    e.preventDefault();
    this.typeInTextarea(this.selectorObjects.commentField, this.getRandomEmoji());
  }

  typeInTextarea(el, newText) {
    var start = el.selectionStart;
    var end = el.selectionEnd;
    var text = el.value;
    var before = text.substring(0, start);
    var after  = text.substring(end, text.length);
    el.value = (before + newText + after);
    el.selectionStart = el.selectionEnd = start + newText.length;
    el.focus();
  }
}
export default new randomShipit();
