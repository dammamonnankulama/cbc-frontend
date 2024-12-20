import React from 'react'

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-8">Welcome to the admin dashboard. Here you can see an overview of your application.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Users</h2>
          <p className="text-3xl">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Orders</h2>
          <p className="text-3xl">567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
          <p className="text-3xl">$12,345</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">New Customers</h2>
          <p className="text-3xl">89</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Activity</th>
              <th className="py-2 px-4 border-b">User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">2023-01-01</td>
              <td className="py-2 px-4 border-b">Order Placed</td>
              <td className="py-2 px-4 border-b">John Doe</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">2023-01-02</td>
              <td className="py-2 px-4 border-b">New User Registered</td>
              <td className="py-2 px-4 border-b">Jane Smith</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">2023-01-03</td>
              <td className="py-2 px-4 border-b">Product Added</td>
              <td className="py-2 px-4 border-b">Admin</td>
            </tr>
          </tbody>
        </table>
      </div>

      
    </div>
  )
}

export default Dashboard