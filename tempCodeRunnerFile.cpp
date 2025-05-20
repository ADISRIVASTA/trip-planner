#include <iostream>
#include <vector>
using namespace std;

// Helper function to calculate sum of digits of an integer
int sumOfDigits(int number) {
    int sum = 0;
    while (number > 0) {
        sum += number % 10;
        number /= 10;
    }
    return sum;
}

// Function to return the sum of digits of products delivered to each client
vector<int> prodDelivery(vector<int> orderID) {
    vector<int> result;
    for (int id : orderID) {
        result.push_back(sumOfDigits(id)); // Add sum of digits for each orderID
    }
    return result;
}

int main() {
    // Input number of clients
    int numOfClients;
    cin >> numOfClients;

    // Input for orderID (products delivered to each client)
    vector<int> orderID(numOfClients);
    for (int idx = 0; idx < numOfClients; ++idx) {
        cin >> orderID[idx];
    }

    // Call prodDelivery and get the result
    vector<int> result = prodDelivery(orderID);

    // Output the result
    for (int idx = 0; idx < result.size(); ++idx) {
        cout << result[idx];
        if (idx != result.size() - 1) {
            cout << " "; // Space between numbers
        }
    }
    cout << endl;

    return 0;
}
