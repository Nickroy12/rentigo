'use client'
import { addCar } from '@/lib/action/action';
import React, { useState, ChangeEvent, FormEvent } from 'react';


interface CarFormData {
  title: string;
  description: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  isAvailable: boolean;
  hiringPrice: string;
  rating: string;
  image: string;
}

const AddCarPage: React.FC = () => {
  const [formData, setFormData] = useState<CarFormData>({
    title: '',
    description: '',
    condition: 'Excellent',
    isAvailable: true,
    hiringPrice: '',
    rating: '5',
    image: ''
  });

  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    if (!image) {
      alert('Please select an image first.');
      setUploading(false);
      return;
    }

    const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
    const imageFormData = new FormData();
    imageFormData.append('image', image);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imageFormData,
      });

      const data = await response.json();

      if (data.success) {
        const uploadedUrl = data.data.url;
        setImageUrl(uploadedUrl);

        // 1. Format data to include image string and convert numeric strings to actual numbers
        const finalCarData = {
          ...formData,
          image: uploadedUrl,
          hiringPrice: parseFloat(formData.hiringPrice),
          rating: parseFloat(formData.rating),
        };
        
        // 2. Call the server mutation action securely
        const uploadData = await addCar(finalCarData);
        
        console.log('Saved Server Database Object:', uploadData);
        alert('Car added successfully!');
        setFormData({
    title: '',
    description: '',
    condition: 'Excellent',
    isAvailable: true,
    hiringPrice: '',
    rating: '5',
    image: ''
  })
        
        // Optional: Reset form fields here if desired
      } else {
        alert('Image upload failed. Double check your API key.');
      }
    } catch (error) {
      console.error('Network or parsing error:', error);
      alert('Something went wrong during the upload process.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white border border-blue-100 rounded-xl shadow-md shadow-blue-50/50">
      <h2 className="text-2xl font-extrabold text-blue-600 mb-6 tracking-tight">Add a New Car</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-blue-950 mb-1">Car Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Tesla Model 3 (2024)"
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-blue-950 mb-1">Car Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe features, space, fuel efficiency..."
            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-semibold text-blue-950 mb-1">Car Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-slate-700"
          >
            <option value="Excellent">Excellent (Like New)</option>
            <option value="Good">Good (Minor Wear)</option>
            <option value="Fair">Fair (Well Used)</option>
          </select>
        </div>

        {/* Price & Rating Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-blue-950 mb-1">Hiring Price ($ / day)</label>
            <input
              type="number"
              name="hiringPrice"
              value={formData.hiringPrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-950 mb-1">Rating (1 - 5)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
              step="0.1"
              placeholder="5.0"
              className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Availability Status Theme Switch */}
        <div className="flex items-center justify-between p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl">
          <div>
            <span className="block text-sm font-bold text-blue-950">Availability Status</span>
            <span className="text-xs text-blue-800/70">Can this vehicle be booked instantly?</span>
          </div>
          <button
            type="button"
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
              formData.isAvailable ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                formData.isAvailable ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Image Input field */}
        <div>
          <label className="block text-sm font-semibold text-blue-950 mb-1">Car Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 active:file:bg-blue-800 file:transition-all cursor-pointer file:shadow-sm"
          />
        
        </div>

        {/* Form Submission */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 px-4 font-bold text-white rounded-lg transition-all shadow-md shadow-blue-600/10 ${
            uploading
              ? 'bg-slate-400 cursor-not-allowed shadow-none'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2'
          }`}
        >
          {uploading ? 'Processing & Uploading...' : 'Add Vehicle'}
        </button>

      </form>
    </div>
  );
};

export default AddCarPage;