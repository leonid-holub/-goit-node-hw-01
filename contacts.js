const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId.toString());
  console.log(result);
  if (!result) {
    return null;
  }

  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId.toString());
  const resultIndex = contacts.indexOf(result);

  contacts.splice(resultIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return result;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: v4(),
    name: name,
    email: email,
    phone: phone,
  };

  const contacts = await listContacts();

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsOperations;
