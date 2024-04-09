"use client"
export const TextInput = ({placeholder, label, onChange} : {
    placeholder : string;
    label : string;
    onChange : (value : string) => void;
}) => {
    return (
        <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input type="text" placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}