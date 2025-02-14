s = "hello"
# Trying to change a character will result in an error:
# s[0] = "H"  # This would raise a TypeError

# Instead, you can create a new string:
s = "H" + s[1:]
print(s)  # Outputs: "Hello"
