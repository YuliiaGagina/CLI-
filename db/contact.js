const contactsPath = require("./path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await getListContacts();

  const contact = data.find((contact) => contact.id === contactId);
  if (!contact) return null;
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = await contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];
};

const addContact = async (name, email, phone) => {
  const contacts = await getListContacts();
  const newContact = { id: v4(), name, email, phone };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = getListContacts;
module.exports = getContactById;
module.exports = removeContact;
module.exports = addContact;
