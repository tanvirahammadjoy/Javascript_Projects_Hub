def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Before calling {func.__name__}")
        result = func(*args, **kwargs)  # Forward all arguments.
        print(f"After calling {func.__name__}")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")

@my_decorator
def greet(name, text, age):
    print(f"Hello, {name}! {text} I'm {age} years old.")

# Works with a single argument:
say_hello("Alice")

# Works with multiple arguments:
greet("Bob", "my name is Bob", 30)
