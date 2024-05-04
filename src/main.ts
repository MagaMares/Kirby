import { makeBirdEnemy, makeFlameEnemy, makeGuyEnemy, makePlayer, setControls } from "./entities";
import { k } from "./kaboomCtx";
import { makeMap } from "./utils";

async function gameSetup() {
    k.loadSprite("assets", "./kirby-like.png", {
        sliceX: 9,
        sliceY: 10,
        anims: {
            kirbIdle: 0,
            kirbInhale: 1,
            kirbFull: 2,
            kirbInhaleEffect: {
                from: 3,
                to: 8,
                speed: 15,
                loop: true,
            },
            shootingStar: 9,
            guyIdle: 18,
            guyWalk: {
                from: 18,
                to: 19,
                speed: 4,
                loop: true,
            },
            bird: {
                from: 27,
                to: 28,
                speed: 4,
                loop: true,
            },
            flame: {
                from: 36,
                to: 37,
                speed: 4,
                loop: true,
            },
        },
    });

    k.loadSprite("level1", "./level1.png");

    const { map: level1Layout, spawnPoints: level1SpawnPoints } = await makeMap(
        k,
        "level1"
    );

    k.scene("level1", async () => {
        k.setGravity(2100);
        k.add([
            k.rect(k.width(), k.height()),
            k.color(k.Color.fromHex("#f7d7db")),
            k.fixed()
        ]);

        k.add(level1Layout);

        const kirb = makePlayer(
            k,
            level1SpawnPoints.Player[0].x,
            level1SpawnPoints.Player[0].y
        );
 
        setControls(k, kirb);
        k.add(kirb);
        k.camScale(k.vec2(0.7));
        k.onUpdate(() => {
            if (kirb.pos.x < level1Layout.pos.x + 432)
                k.camPos(kirb.pos.x + 500, 750);
        });

        for (const flame of level1SpawnPoints.Flame) {
            makeFlameEnemy(k, flame.x, flame.y);
        }

        for (const guy of level1SpawnPoints.Guy) {
            makeGuyEnemy(k, guy.x, guy.y);
        }

        for (const bird of level1SpawnPoints.Bird) {
            const possibleSpeeds = [100, 200, 300];
            k.loop(10, () => {
                makeBirdEnemy(
                    k,
                    bird.x,
                    bird.y,
                    possibleSpeeds[Math.floor(Math.random() * possibleSpeeds.length)]
                );
            });
        }
    });

    k.go("level1");
}

gameSetup();
