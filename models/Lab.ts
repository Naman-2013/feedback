import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct {
  id: string;
  name: string;
  icon: string;
}

export interface ILab extends Document {
  labId: string;
  labName: string;
  products: IProduct[];
}

const ProductSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  }
});

const LabSchema: Schema = new Schema({
  labId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  labName: {
    type: String,
    required: true,
    trim: true
  },
  products: [ProductSchema]
});

export default mongoose.models.Lab || mongoose.model<ILab>('Lab', LabSchema);
