class imageHost {

  constructor() {

    this.clientID = 'e51bbf85b194589';
    this.clickHandler = this.clickHandler.bind(this);

    chrome.contextMenus.create({
      "title": "Host This Image",
      "contexts": ["image", "link", "editable", "selection"],
      "onclick" : (e) => { this.clickHandler(e) }
    });

  }

  static isDecember() {
    return new Date().getMonth() === 11;
  }

  clickHandler(e) {

    if (e.selectionText) {
      // The user selected some text, put this in the message.
    }

    if (e.mediaType === "image") {
      this.upload(e.srcUrl);
    }

    if (e.linkUrl) {

    }
  }

  upload(file) {

    const formData = new FormData();
    const xhttp = this.xhr();

    formData.append('image', file);

    xhttp.open('POST', 'https://api.imgur.com/3/image');
    xhttp.setRequestHeader('Authorization', `Client-ID ${this.clientID}`);
    xhttp.onreadystatechange = function () {
      var res = JSON.parse(xhttp.responseText), link;

      if ( xhttp.status === 200 && xhttp.readyState === 4 && res.status === 200) {
        link = res.data.link;
        imageHost.copyToClipboard(link);

        new Notification('Image successful Hosted', {
          icon: `images/${imageHost.isDecember() ? 'xmas':'normal'}/48x48.png`,
          body: 'The link to the hosted image is copied to the clipboard.'
        });

      } else if (xhttp.readyState === 4) {
        new Notification('Error status: ' + xhttp.status, {
          icon: `images/${imageHost.isDecember() ? 'xmas':'normal'}/48x48.png`,
          body: res.data.error
        });
      }
    };

    xhttp.send(formData);
  }

  static copyToClipboard(text) {
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  };

  xhr() {
    return new XMLHttpRequest();
  }
}

export default new imageHost();
