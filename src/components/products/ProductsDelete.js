import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import CustomButton from "@/components/ui/CustomButton";

export default function DeleteProduct({ productName, onConfirm, onCancel }) {
  return (
    <>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
          <ExclamationTriangleIcon
            aria-hidden="true"
            className="size-6 text-red-600"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-base font-semibold text-gray-900">
            Delete Product
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete "{productName}"? This product will
              be permanently removed from our servers forever. This action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <CustomButton label="Delete" onClick={onConfirm} />
        <CustomButton type="secondary" label="Cancel" onClick={onCancel} />
      </div>
    </>
  );
}
