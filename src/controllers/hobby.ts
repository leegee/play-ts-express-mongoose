import { Hobby } from '../models/hobby';

export type HobbyInputType = {
  name: string;
  year: number;
  passionLevel: number;
};

export type StoredHobbyType = HobbyInputType & {
  _id: string;
};

export const listAll = async () => {
  return await Hobby.find();
}

export const create = async (body: HobbyInputType): Promise<StoredHobbyType> => {
  console.log('Hobby create from', body);
  const hobby = new Hobby(body);
  await hobby.save();
  console.log('Hobby created', hobby);
  return hobby;
};

export const retrieve = async (id: string): Promise<StoredHobbyType> => {
  console.log('Hobby find', id);
  const hobby = await Hobby.findById(id);
  console.log('Hobby found', id, hobby);
  return hobby;
}

// any - research required, any of the fields in InputHobbyType
export const update = async (body: any): Promise<StoredHobbyType> => {
  console.log('Hobby update', body);
  const hobby = await Hobby.findByIdAndUpdate(body._id, body, { new: true, useFindAndModify: false });
  console.log('Hobby updated', hobby);
  return hobby;
}

export const del = async (id: string): Promise<void> => {
  console.log('Hobby delete', id);
  await Hobby.findByIdAndDelete(id);
  console.log('Hobby deleted');
}
