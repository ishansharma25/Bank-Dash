import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Send } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import data from '@/Data/data.json';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const BankingDashboard = () => {
  const [loggedInUserId] = useState(1);

  const currentUser = data.users.find(user => user.id === loggedInUserId);
  const defaultCard = currentUser.profile.cards.find(card => card.isDefault) || currentUser.profile.cards[0];

  const allTransactions = currentUser.profile.cards.flatMap(card => 
    card.recentTransactions.map(transaction => ({
      ...transaction,
      cardNumber: card.cardNumber,
      currency: card.currency
    }))
  );

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Chart.js data configuration for Weekly Activity
  const weeklyActivityConfig = {
    data: {
      labels: data.weeklyActivityData.map(item => item.day),
      datasets: [
        {
          label: 'Deposit',
          data: data.weeklyActivityData.map(item => item.deposit),
          backgroundColor: '#4169E1',
        },
        {
          label: 'Withdraw',
          data: data.weeklyActivityData.map(item => item.withdraw),
          backgroundColor: '#00D1D1',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            borderDash: [3, 3]
          }
        }
      }
    }
  };

  // Chart.js data configuration for Expense Statistics
  const expenseConfig = {
    data: {
      labels: data.expenseData.map(item => item.name),
      datasets: [{
        data: data.expenseData.map(item => item.value),
        backgroundColor: ['#FF1493', '#483D8B', '#FFA500', '#0000FF'],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const dataset = context.dataset;
              const total = dataset.data.reduce((acc, data) => acc + data, 0);
              const value = dataset.data[context.dataIndex];
              const percentage = ((value / total) * 100).toFixed(0);
              return `${context.label}: ${percentage}%`;
            }
          }
        }
      }
    }
  };

  // Chart.js data configuration for Balance History
  const balanceHistoryConfig = {
    data: {
      labels: data.balanceHistoryData.map(item => item.month),
      datasets: [{
        label: 'Balance',
        data: data.balanceHistoryData.map(item => item.balance),
        borderColor: '#4169E1',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            borderDash: [3, 3]
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cards Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Cards</h2>
            <div className="space-x-4 text-sm text-gray-500">
              <span>See All</span>
              <span>Recent Transaction</span>
            </div>
          </div>

          <div className="flex space-x-4 overflow-x-auto">
            {currentUser.profile.cards.map((card, index) => (
              <Card 
                key={card.id}
                className={`min-w-[300px] ${card.isDefault ? 'bg-blue-600 text-white' : 'bg-white'} p-6 rounded-xl`}
              >
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      {formatCurrency(card.balance, card.currency)}
                    </span>
                    <span className="text-3xl">⬡</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>CARD HOLDER</span>
                      <span>VALID THRU</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{card.cardHolder}</span>
                      <span>{card.validThru}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">{card.cardNumber}</span>
                      <div className="flex space-x-2">
                        <span className="w-4 h-4 bg-white rounded-full opacity-70"></span>
                        <span className="w-4 h-4 bg-white rounded-full"></span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
       {/* Recent Transactions */}
<div className="bg-white p-6 rounded-xl">
  <h3 className="font-semibold mb-4">Recent Transactions</h3>
  <div className="space-y-4">
    {allTransactions.map(transaction => (
      <div key={transaction.id} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Use images for transaction types */}
          <img
            src={
              transaction.type === 'deposit'
                ? '/credit.png'
                : transaction.type === 'payment'
                ? '/paypal.png'
                : '/with.png'
            }
            alt={transaction.type}
            className="h-10 w-10"
          />
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">{transaction.date}</p>
          </div>
        </div>
        <span
          className={`font-semibold ${
            transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {formatCurrency(transaction.amount, transaction.currency)}
        </span>
      </div>
    ))}
  </div>
</div>


        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Weekly Activity</h3>
          <div className="h-[200px]">
            <Bar {...weeklyActivityConfig} />
          </div>
        </div>

        {/* Expense Statistics */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Expense Statistics</h3>
          <div className="h-[200px]">
            <Pie {...expenseConfig} />
          </div>
        </div>

        {/* Quick Transfer */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Quick Transfer</h3>
          <div className="flex space-x-4 mb-6">
            {data.quickTransferContacts.map((contact, index) => (
              <div key={index} className="text-center">
                <img
                  src={contact.img}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
                <p className="font-medium text-sm">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.role}</p>
              </div>
            ))}
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex space-x-4">
          
            <input
              type="text"
              placeholder="Write amount"
              className="flex-1 p-2 border rounded-lg"
              defaultValue="$0.0"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2">
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Balance History */}
        <div className="bg-white p-6 rounded-xl">
          <h3 className="font-semibold mb-4">Balance History</h3>
          <div className="h-[200px]">
            <Line {...balanceHistoryConfig} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingDashboard;