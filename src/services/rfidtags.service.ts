import { RfidTag } from '@/types';

async function addNewTag({ data }: { data: RfidTag }) {
  const res = await fetch('/api/rfid-tags/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res;
}

async function getAllRfidTags() {
  const res = await fetch('/api/rfid-tags/get', {
    method: 'GET',
  });

  return res;
}

async function deleteRfidTag({ rfidTag }: { rfidTag: RfidTag['rfidTag'] }) {
  const res = await fetch('/api/rfid-tags/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rfidTag }),
  });

  return res;
}

async function deleteAllRfidTags() {
  const res = await fetch('/api/rfid-tags/delete-all', {
    method: 'DELETE',
  });

  return res;
}

async function linkRfidTagToDriver({
  rfidTag,
}: {
  rfidTag: RfidTag['rfidTag'];
}) {
  const res = await fetch('/api/rfid-tags/linking', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rfidTag }),
  });

  return res;
}

export {
  addNewTag,
  deleteAllRfidTags,
  deleteRfidTag,
  getAllRfidTags,
  linkRfidTagToDriver,
};
