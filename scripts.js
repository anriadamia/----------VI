let currentPage = 1;
let totalPages;
function getUsersFunction(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseTextInfo) {
      if (responseTextInfo.status !== 200) {
        throw "error";
      }

      return responseTextInfo.json();
    })
    .then(function (responseJsData) {
      const fragment = new DocumentFragment();
      responseJsData.data.forEach((element) => {
        let li = document.createElement("li");
        li.textContent = `${element.first_name} ${element.last_name}`;
        let img = document.createElement("img");
        img.src = element.avatar;
        img.alt = "avatar of users";
        fragment.appendChild(li);
        fragment.appendChild(img);
      });

      document.getElementById("list-users").innerHTML = " ";
      document.getElementById("list-users").appendChild(fragment);
      document.getElementById("imgcontainer").appendChild(fragment);
      totalPages = responseJsData.total_pages;
    })

    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "Page Not Found";
        document.getElementById("userInfo").appendChild(p);
      } else if (error == 500) {
        let p = document.createElement("p");
        p.textContent = "Server Error";
        document.getElementById("userInfo").appendChild(p);
      }
      let p = document.createElement("p");
      p.textContent = "Error";
      document.getElementById("userInfo").appendChild(p);
    });
}

document.getElementById("loadprevious").addEventListener("click", function () {
  if (currentPage == 1) {
    return;
  }

  currentPage -= 1;
  getUsersFunction(currentPage);
});
getUsersFunction(currentPage);

document.getElementById("loadMore").addEventListener("click", function () {
  if (currentPage == totalPages) {
    return;
  }

  currentPage += 1;
  getUsersFunction(currentPage);
});
getUsersFunction(currentPage);
