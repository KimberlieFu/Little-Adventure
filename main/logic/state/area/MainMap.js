import MapState from "./MapState.js";
import { initializeMainMapGameAssets, InitializeFonts } from "../../map/LoadConfig.js";


export class MainMap extends MapState {
    constructor(canvas, c) {
        super();
        this.canvas = canvas;
        this.c = c;
        this.isInitialized = false;
        this.isMapLoaded = false;
        this.closestEntrance = null;
    }

    async loadAssets() {
        try {
            const { regularFont, boldFont, blackFont } = await InitializeFonts("en", this.c);
            const assets = await initializeMainMapGameAssets(this.canvas, this.c);

            this.mainMap = assets.mapImage;
            this.mainForeground = assets.mapForeground;
            this.player = assets.player;
            this.camera = assets.camera;
            this.mapWidth = assets.mapWidth;
            this.mapHeight = assets.mapHeight;
            this.mapCollision = assets.mapCollision;
            this.mapEntrance = assets.mapEntrance;
            
            this.font = {
                regular: regularFont,
                bold: boldFont,
                black: blackFont
            };

            this.mainMap.onload = this.onLoad.bind(this);
            this.mainMap.onerror = (error) => console.error('Error loading map image:', error);

            if (this.mainMap.complete) {
                this.isMapLoaded = true;
                this.onLoad();
            }

            if (this.font) {
                this.applyFontToCanvas(this.font.regular);
            }

            console.log('Game assets loaded successfully.');
            this.isInitialized = true;

        } catch (error) {
            console.error('Error initializing the main map:', error);
        }
    }

    onLoad() {
        this.isMapLoaded = true;
        console.log('Map loaded successfully.');
    }


    applyFontToCanvas(font) {
        if (font) {
            this.c.font = `16px ${font.family}`;
            console.log(`Font applied: ${font.family}`);
        } else {
            console.error('Font is not available.');
        }
    }

    // Function to draw sample text on the canvas
    drawSampleText() {
        if (this.isInitialized) {
            if (this.c) {
                // Save the current canvas state
                this.c.save();
                
                // Set font and draw the first sample text
                this.c.font = `30px ${this.font.regular.family}`;
                this.c.fillText("test", 100, 100);

                // Change font to bold and draw the second sample text
                this.c.font = `30px ${this.font.bold.family}`;
                this.c.fillText("粗体字体的示例文本", 100, 150);

                // Change font to black and draw the third sample text
                this.c.font = `30px ${this.font.black.family}`;
                this.c.fillText("黑体字体的示例文本", 100, 200);

                // Restore the original canvas state
                this.c.restore();
            } else {
                console.error('Canvas context (c) is undefined.');
            }
        }
    }




    update() {
        this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.c.drawImage(this.mainMap, this.camera.x, this.camera.y);

        this.mapCollision.forEach(row => {
            row.forEach((boundary) => {
                boundary.update(this.camera);
            });
        });
    

        let nearestDistance = Infinity;
        this.mapEntrance.forEach(entrance => {
            entrance.update(this.camera, this.player);
        });

        
        if (this.closestEntrance) {
            this.closestEntrance.update(this.camera, this.player, true);
        }

        this.player.update();
        this.player.animate();
        this.player.handleInput();
    
        this.c.drawImage(this.mainForeground, this.camera.x, this.camera.y);
        this.drawSampleText()

      
    
        requestAnimationFrame(this.update.bind(this));
    }
}

