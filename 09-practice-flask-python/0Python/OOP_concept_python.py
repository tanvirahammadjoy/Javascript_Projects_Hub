class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement abstract method")

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow!"

class Dog(Animal):
    def speak(self):
        return f"{self.name} says woof!"

# Creating instances
cat = Cat("Whiskers")
dog = Dog("Buddy")

print(cat.speak())  # Output: Whiskers says meow!
print(dog.speak())  # Output: Buddy says woof!

def animal_sound(animal):
    print(animal.speak())

# Both cat and dog have their own implementation of speak()
for pet in (cat, dog):
    animal_sound(pet)
