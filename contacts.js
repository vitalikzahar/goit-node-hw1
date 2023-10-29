const fs = require("node:fs/promises");
const path = require("node:path");

const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });

  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  if (contact === undefined) {
    return null;
  } else {
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const contactRemove = await getContactById(contactId);
  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContacts);
  return contactRemove;
}
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(contact);

  await writeContacts(contact);

  return contact;
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
