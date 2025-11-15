async function getDb() {
  return {
    user: {
      findMany: () => {
        return [{ name: 'User 1' }, { name: 'User 2' }];
      },
    },
  };
}

export async function getAllUsers() {
  const db = await getDb();
  return db.user.findMany();
}
