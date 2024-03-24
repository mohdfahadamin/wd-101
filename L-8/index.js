const email = document.getElementById("email");
email.addEventListener("input", () => validate(email));

const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  validate(email);

  const dob = document.getElementById("dob").value;
  if (!checkMyDateWithinRange(new Date(dob))) {
    event.preventDefault();
    alert("The date must be between 01/01/2022 and 24/03/2024");
  }
});

function checkMyDateWithinRange(myDate) {
  var startDate = new Date(2022, 0, 1);
  var endDate = new Date(2024, 2, 24);
  return startDate <= myDate && myDate <= endDate;
}

function validate(element) {
  if (element.validity.typeMismatch) {
    element.setCustomValidity("The email is not in the right format!");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const userForm = document.getElementById("user_form");
const userEntriesDisplay = document.getElementById("user-entries");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
      const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
      const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
      const dobCell = `<td class="border px-4 py-2">${entry.dob}</td>`;
      const acceptTermsCell = `<td class="border px-4 py-2">${entry.acceptedTermsAndConditions}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table class="table-auto w-full">
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">DOB</th>
        <th class="px-4 py-2">Accepted Terms?</th>
      </tr>
      ${tableEntries}
    </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const acceptedTermsAndConditions =
    document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndConditions,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

userForm.addEventListener("submit", saveUserForm);

displayEntries();
