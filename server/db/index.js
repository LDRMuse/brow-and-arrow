import client from './client';

export const addAdmin = async (newAdmin) => {
  try {
    const insertRes = await client.db('BrowAndArrow').collection('admins').insertOne(newAdmin);
    return insertRes;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAdmin = async () => {
  try {
    const deleteRes = await client.db('BrowAndArrow').collection('admins').remove();
    return deleteRes;
  } catch (error) {
    console.error(error);
  }
};

export const getAdmin = async (uid) => {
  try {
    return await client.db('BrowAndArrow').collection('admins').findOne(uid);
  } catch (err) {
    throw new Error(err);
  }
};

export const addClient = async (newClient) => {
  try {
    const insertRes = await client.db('BrowAndArrow').collection('clients').insertOne(newClient);
    return insertRes;
  } catch (error) {
    console.error(error);
  }
};

export const deleteClient = async () => {
  try {
    const deleteRes = await client.db('BrowAndArrow').collection('clients').remove();
    return deleteRes;
  } catch (error) {
    console.error(error);
  }
};

export const addChartEntry = async (chart, email) => {
  try {
    const insertRes = await client.db('BrowAndArrow').collection('clients').updateOne({ email }, { $push: { charts: chart } });
    return insertRes;
  } catch (error) {
    console.error(error);
  }
};

export const showAllClients = async (admin) => {
  try {
    const res = await client.db('BrowAndArrow').collection('clients').find(admin).toArray();
    return res;
  } catch (error) {
    console.error(error);
  }
};
