import { Driver } from '@/types';

async function registerNewDriver({ data }: { data: Driver }) {
  const res = await fetch('/api/drivers/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res;
}

async function getRegisteredDriver() {
  const res = await fetch('/api/drivers/get', {
    method: 'GET',
  });

  return res;
}

async function deleteRegisteredDriver({
  rfidTag,
}: {
  rfidTag: Driver['rfidTag'];
}) {
  const res = await fetch(`/api/drivers/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rfidTag }),
  });

  return res;
}

async function updateRegisteredDriver({
  rfidTag,
  data,
}: {
  rfidTag: Driver['rfidTag'];
  data: Partial<Driver>;
}) {
  const res = await fetch(`/api/drivers/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rfidTag, ...data }),
  });

  return res;
}

async function deleteAllRegisteredDrivers() {
  const res = await fetch('/api/drivers/delete-all', {
    method: 'DELETE',
  });

  return res;
}

export {
  deleteAllRegisteredDrivers,
  deleteRegisteredDriver,
  getRegisteredDriver,
  registerNewDriver,
  updateRegisteredDriver,
};
