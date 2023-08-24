export default function InputForm ({ label, id, type = 'text', onChange, register, validations, messageError }) {
  const error = validations ? messageError(id) : null
  return (
    <div className="mb-4">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          name={id}
          onChange={onChange}
          className={`border p-2 w-full transition-all duration-300 rounded-sm ${
            error
              ? 'border-red-600 focus:border-red-600'
              : 'border-gray-300 focus:border-blue-500'
          }`}
          { ...register(id, validations)}
        />
        {error &&
          <span className='text-red-600 text-sm italic'>
            {error}
          </span>
        }
      </div>
  )
}
