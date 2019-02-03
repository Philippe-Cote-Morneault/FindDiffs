
      this.gamesCardService.deleteGameCard(this.gameCard.id).subscribe((message: Message) => {
        window.location.reload();
      });
    }
  }

  public resetBestTimes(): void {
    if (confirm("Are you sure you want to reset the best times of the Game Card called " + this.gameCard.title + "?")) {
      this.gamesCardService.resetBestTimes(this.gameCard).subscribe((message: Message) => {
        if (message.title !== "Error") {
        window.location.reload();
        }
      });
    }
  }
}
