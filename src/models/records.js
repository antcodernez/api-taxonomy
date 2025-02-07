import mongoose from 'mongoose';

// Define the schema for a taxonomic record
const recordSchema = new mongoose.Schema({
  commonName: String,
  scientificName: String,
  family: String,
  order: String,
  description: String
});

// Create the model
const Record = mongoose.model('Record', recordSchema);

export default Record;
