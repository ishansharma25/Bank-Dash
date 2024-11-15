from math import gcd
from functools import reduce

def minimize_effort(effort):
    # Calculate the GCD of all elements in the array
    # This gives us the smallest number to which all elements can be reduced.
    minimum_effort = reduce(gcd, effort)
    
    # Return the minimum possible total effort by summing the minimized array
    return minimum_effort * len(effort)

# Test case
n = 5
effort = [3, 6, 2, 5, 25]
print("Minimum total effort:", minimize_effort(effort))
