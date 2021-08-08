import { User } from '../models/user';

export type UserInputType = {
  name: string;
  hobbies: any[]; // for now
};

export type StoredUserType = UserInputType & {
  _id: string;
};

export const listAll = async () => {
  return await User.find();
}

export const create = async (body: UserInputType): Promise<StoredUserType> => {
  console.log('User create from', body);
  const user = new User({
    name: body.name,
    hobbies: body.hobbies,
  });
  await user.save();
  console.log('User created', user);
  return user;
};

export const retrieve = async (id: string): Promise<StoredUserType> => {
  console.log('User find ID', id);
  const user = await User.findById(id);
  console.log('User ID %s found', id, user);
  return user;
}

export const update = async (body: any): Promise<StoredUserType> => {
  console.log('User update', body);
  const user = await User.findOneAndUpdate({ _id: body._id }, body);
  return user;
}

export const del = async (id: string): Promise<void> => {
  console.log('User delete', id);
  await User.findByIdAndDelete(id);
  console.log('User deleted');
}
