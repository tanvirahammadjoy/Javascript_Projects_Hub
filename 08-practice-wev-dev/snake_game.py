import tkinter as tk
import random

class SnakeGame:
    def __init__(self, master):
        self.master = master
        self.master.title("Snake Game")
        self.master.geometry("600x400")
        self.master.resizable(False, False)
        
        # Game variables
        self.snake = [(100, 100), (80, 100), (60, 100)]
        self.food = None
        self.direction = "Right"
        self.score = 0
        self.game_paused = False
        self.game_running = False
        self.game_over = False
        
        # GUI elements
        self.create_widgets()
        self.create_overlays()
        
        # Key bindings
        self.master.bind("<Key>", self.on_key_press)
        
    def create_widgets(self):
        # Main game canvas
        self.canvas = tk.Canvas(self.master, bg="black", width=600, height=400)
        self.canvas.pack()
        
        # Score display
        self.score_label = tk.Label(self.master, text="Score: 0", fg="white", bg="black")
        self.score_label.place(x=10, y=10)
        
        # Pause button (added to main game screen)
        self.pause_btn = tk.Button(self.master, text="Pause", command=self.pause_game)
        self.pause_btn.place(x=550, y=10)
        
    def create_overlays(self):
        # Start screen overlay
        self.start_overlay = tk.Frame(self.master, bg="gray20")
        self.start_overlay.place(x=0, y=0, width=600, height=400)
        tk.Label(self.start_overlay, text="SNAKE GAME", fg="white", bg="gray20", 
                font=("Arial", 24)).pack(pady=50)
        tk.Button(self.start_overlay, text="Start Game", command=self.start_game).pack()
        
        # Pause overlay
        self.pause_overlay = tk.Frame(self.master, bg="gray30")
        tk.Label(self.pause_overlay, text="PAUSED", fg="white", bg="gray30", 
                font=("Arial", 24)).pack(pady=50)
        tk.Button(self.pause_overlay, text="Resume", command=self.resume_game).pack()
        tk.Button(self.pause_overlay, text="Restart", command=self.restart_game).pack()
        
        # Game over overlay
        self.game_over_overlay = tk.Frame(self.master, bg="gray40")
        tk.Label(self.game_over_overlay, text="GAME OVER", fg="white", bg="gray40", 
                font=("Arial", 24)).pack(pady=50)
        tk.Button(self.game_over_overlay, text="Restart", command=self.restart_game).pack()
        
        # Show start screen initially
        self.start_overlay.lift()
        
    def start_game(self):
        self.start_overlay.place_forget()
        self.game_running = True
        self.game_over = False
        self.score = 0
        self.snake = [(100, 100), (80, 100), (60, 100)]
        self.direction = "Right"
        self.spawn_food()
        self.update_score()
        self.move()
        
    def restart_game(self):
        self.game_over_overlay.place_forget()
        self.pause_overlay.place_forget()
        self.start_game()
        
    def resume_game(self):
        self.pause_overlay.place_forget()
        self.game_paused = False
        self.move()
        
    def pause_game(self):
        if self.game_running and not self.game_over:
            self.game_paused = True
            self.pause_overlay.place(x=0, y=0, width=600, height=400)
            self.pause_overlay.lift()
        
    def update_score(self):
        self.score_label.config(text=f"Score: {self.score}")
        
    def spawn_food(self):
        while True:
            x = random.randint(1, 29) * 20
            y = random.randint(1, 19) * 20
            if (x, y) not in self.snake:
                self.food = (x, y)
                break
        
    def move(self):
        if self.game_paused or self.game_over or not self.game_running:
            return
            
        head_x, head_y = self.snake[0]
        
        directions = {
            "Right": (head_x + 20, head_y),
            "Left": (head_x - 20, head_y),
            "Up": (head_x, head_y - 20),
            "Down": (head_x, head_y + 20)
        }
        new_head = directions[self.direction]
            
        # Collision detection
        if (new_head in self.snake or 
            new_head[0] < 0 or new_head[0] >= 600 or 
            new_head[1] < 0 or new_head[1] >= 400):
            self.game_over = True
            self.game_over_overlay.place(x=0, y=0, width=600, height=400)
            self.game_over_overlay.lift()
            return
            
        self.snake.insert(0, new_head)
        
        # Food handling
        if new_head == self.food:
            self.score += 1
            self.update_score()
            self.spawn_food()
        else:
            self.snake.pop()
            
        self.draw_game()
        self.master.after(100, self.move)
        
    def draw_game(self):
        self.canvas.delete("all")
        for x, y in self.snake:
            self.canvas.create_rectangle(x, y, x+20, y+20, fill="green")
        if self.food:
            x, y = self.food
            self.canvas.create_oval(x, y, x+20, y+20, fill="red")
        
    def on_key_press(self, event):
        key = event.keysym
        opposites = {"Right": "Left", "Left": "Right", "Up": "Down", "Down": "Up"}
        if key in opposites and self.direction != opposites[key]:
            self.direction = key
        elif key in ["space", "p"] and self.game_running and not self.game_over:
            self.pause_game()
                
if __name__ == "__main__":
    root = tk.Tk()
    game = SnakeGame(root)
    root.mainloop()