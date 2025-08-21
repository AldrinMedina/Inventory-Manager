import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";

export default function ProductForm({
  formData,
  setFormData,
  onClick,
  onClose,
}) {
  // Predefined categories
  const categories = [
    "Fruits and Vegetables",
    "Canned Goods",
    "Dairy",
    "Meat",
    "Fish & Seafood",
    "Condiments & Spices",
    "Snacks",
    "Bread & Bakery",
    "Beverages",
    "Pasta, Rice & Cereal",
    "Frozen Foods",
    "Personal Care",
    "Household & Cleaning Supplies",
    "Others"
  ];

  const fields = [
    {
      label: "Product Name",
      name: "product_name",
      type: "text",
      placeholder: "Enter product name",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Enter description",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Enter price",
    },
    {
      label: "Image URL",
      name: "img_url",
      type: "text",
      placeholder: "Enter image URL",
    },
  ];

  return (
    <div className="space-y-4">
      {fields.map(({ label, name, type, placeholder }) => (
        <CustomInput
          key={name}
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        />
      ))}

      {/* Category Select Dropdown */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <CustomButton onClick={onClick} label="Save" />
        <CustomButton type="secondary" onClick={onClose} label="Cancel" />
      </div>
    </div>
  );
}