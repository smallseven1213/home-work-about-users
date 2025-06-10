export interface User {
  id: number;
  name: string;
}

const generateFakeUser = (id: number): User => {
  const firstNames = [
    '張',
    '李',
    '王',
    '陳',
    '劉',
    '楊',
    '黃',
    '趙',
    '周',
    '吳',
    '徐',
    '孫',
    '馬',
    '朱',
    '胡',
    '郭',
    '林',
    '何',
    '高',
    '梁',
    'John',
    'Jane',
    'Mike',
    'Sarah',
    'David',
    'Emily',
    'Chris',
    'Lisa',
    'Tom',
    'Amy',
  ];

  const lastNames = [
    '志明',
    '美玲',
    '建華',
    '淑芬',
    '俊傑',
    '雅婷',
    '家豪',
    '怡君',
    '宗翰',
    '佩君',
    '子軒',
    '怡萱',
    '承翰',
    '語彤',
    '宇軒',
    '品妤',
    '柏翰',
    '詠晴',
    '冠廷',
    '羽彤',
    'Smith',
    'Johnson',
    'Brown',
    'Davis',
    'Wilson',
    'Moore',
    'Taylor',
    'Anderson',
    'Thomas',
    'Jackson',
  ];

  const getRandomItem = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const name = `${firstName}${lastName}`;

  return {
    id,
    name,
  };
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getUsers = async (count: number = 1000000): Promise<User[]> => {
  await delay(500);

  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    users.push(generateFakeUser(i));
  }

  return users;
};
