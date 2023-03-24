class CookieUtils {
  static setCookie(name, value, expires) {
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  }

  static getCookieValue(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookiePart = cookieArray[i];
      
      while (cookiePart.charAt(0) == " ") {
        cookiePart = cookiePart.substring(1);
      }

      if (cookiePart.indexOf(name) == 0) {
        return cookiePart.substring(name.length, cookiePart.length);
      }
    }
    return "";
  }
}
