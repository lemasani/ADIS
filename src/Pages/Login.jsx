import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from '../Components/Endpoints';

export default function Login() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      password: Yup.string().min(6, 'Must be 8 characters or more').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login(values);
        console.log('Login successful:', response);
        sessionStorage.setItem('userData', JSON.stringify(response)); // Store user data in session storage
        navigate('/dashboard');
        // Handle successful login (e.g., redirect to home page)
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure (e.g., display error message)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (

    <>
      <div className="form-container p-10">

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <h1 className='font-bold text-blue-600'>Welcome back please Login</h1>
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full p-2 border border-gray-400 rounded"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-xs">{formik.errors.name}</div>
            ) : null}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-2 border border-gray-400 rounded"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-xs">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>

      </div>
    </>
  );
}