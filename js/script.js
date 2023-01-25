let activePage = 4
const contactLimit = 10
const jsonList = users

const totalContacts = document.querySelector('h3')
totalContacts.insertAdjacentHTML("beforeend", " " + jsonList.length)

const paginationNumbers = document.getElementById("paginationNumbers")

const createPageButtons = () => {
  for (let i = 1; i <= pageCount(); i++) {
    addPaginationNumber(i)
  }
}

const addPaginationNumber = (pageNumber) => {
  const pageButton = document.createElement("button")
  pageButton.innerHTML = pageNumber
  pageButton.setAttribute("pageNumber", pageNumber)
  pageButton.setAttribute("onClick", `changePage(` + pageNumber + `)`)
  pageButton.setAttribute("class", "pageButtons")
  paginationNumbers.appendChild(pageButton)
}

function changePage(page) {
  const btnForward = document.getElementById("btnForward")
  const btnBackward = document.getElementById("btnBackward")
  const contactList = document.getElementById("contactList")

  contactList.innerHTML = ""

  page < 1 ? page = 1 : null;
  page > pageCount() ? page = pageCount() : null;

  for (let i = (page - 1) * contactLimit; i < (page * contactLimit) && i < jsonList.length; i++) {
    const joinDate = new Date(jsonList[i].registered.date).toLocaleDateString('en-US')
    let li = document.createElement("li")
    li.innerHTML = `<div class="contact-details">
                      <img class="avatar" src=` + jsonList[i].picture.thumbnail + `>
                      <h3>`+ jsonList[i].name.first + ` ` + jsonList[i].name.last + `</h3>
                      <span class="email">`+ jsonList[i].email +`</span>
                    </div>
                    <div class="joined-details">
                    <span class="date">Joined `+ joinDate +`</span>
                    </div>`
    li.className = "contact-item cf"
    contactList.appendChild(li)
  }
};

const pageCount = () => {
  return Math.ceil(jsonList.length / contactLimit)
}

window.onload = function() {
  changePage(1);
  createPageButtons();
};
