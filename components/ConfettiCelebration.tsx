import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ConfettiPiece {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  rotation: Animated.Value;
  scale: Animated.Value;
  initialX: number;
  initialScale: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
}

interface ConfettiCelebrationProps {
  show: boolean;
  onComplete?: () => void;
}

const CONFETTI_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
];

const CONFETTI_COUNT = 50;

export default function ConfettiCelebration({
  show,
  onComplete,
}: ConfettiCelebrationProps) {
  const confettiPieces = useRef<ConfettiPiece[]>([]);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (show) {
      startConfetti();
    } else {
      stopConfetti();
    }

    return () => {
      stopConfetti();
    };
  }, [show]);

  const createConfettiPiece = (id: number): ConfettiPiece => {
    const initialX = Math.random() * width;
    const initialScale = 0.5 + Math.random() * 0.5;
    return {
      id,
      x: new Animated.Value(initialX),
      y: new Animated.Value(-50),
      rotation: new Animated.Value(0),
      scale: new Animated.Value(initialScale),
      initialX,
      initialScale,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as
        | 'circle'
        | 'square'
        | 'triangle',
    };
  };

  const startConfetti = () => {
    // Create confetti pieces
    confettiPieces.current = Array.from({ length: CONFETTI_COUNT }, (_, i) =>
      createConfettiPiece(i)
    );

    // Create animations for each piece
    const animations = confettiPieces.current.map((piece) => {
      const fallDuration = 3000 + Math.random() * 2000;
      const swayAmount = 50 + Math.random() * 100;

      return Animated.parallel([
        // Fall down
        Animated.timing(piece.y, {
          toValue: height + 100,
          duration: fallDuration,
          useNativeDriver: true,
        }),
        // Sway left and right
        Animated.loop(
          Animated.sequence([
            Animated.timing(piece.x, {
              toValue: piece.initialX + swayAmount,
              duration: 1000 + Math.random() * 1000,
              useNativeDriver: true,
            }),
            Animated.timing(piece.x, {
              toValue: piece.initialX - swayAmount,
              duration: 1000 + Math.random() * 1000,
              useNativeDriver: true,
            }),
          ]),
          { iterations: -1 }
        ),
        // Rotate
        Animated.loop(
          Animated.timing(piece.rotation, {
            toValue: 360,
            duration: 1000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          { iterations: -1 }
        ),
        // Scale pulse
        Animated.loop(
          Animated.sequence([
            Animated.timing(piece.scale, {
              toValue: piece.initialScale * 1.2,
              duration: 500 + Math.random() * 500,
              useNativeDriver: true,
            }),
            Animated.timing(piece.scale, {
              toValue: piece.initialScale,
              duration: 500 + Math.random() * 500,
              useNativeDriver: true,
            }),
          ]),
          { iterations: -1 }
        ),
      ]);
    });

    // Start all animations
    animationRef.current = Animated.parallel(animations);
    animationRef.current.start(() => {
      // Animation completed
      onComplete?.();
    });

    // Auto-stop after 4 seconds
    setTimeout(() => {
      stopConfetti();
      onComplete?.();
    }, 4000);
  };

  const stopConfetti = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    confettiPieces.current = [];
  };

  const renderConfettiPiece = (piece: ConfettiPiece) => {
    const transform = [
      {
        translateX: piece.x,
      },
      {
        translateY: piece.y,
      },
      {
        rotate: piece.rotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        }),
      },
      {
        scale: piece.scale,
      },
    ];

    let shapeStyle;
    switch (piece.shape) {
      case 'circle':
        shapeStyle = styles.circle;
        break;
      case 'square':
        shapeStyle = styles.square;
        break;
      case 'triangle':
        shapeStyle = styles.triangle;
        break;
      default:
        shapeStyle = styles.circle;
    }

    return (
      <Animated.View
        key={piece.id}
        style={[
          styles.confettiPiece,
          shapeStyle,
          {
            backgroundColor: piece.color,
            transform,
          },
        ]}
      />
    );
  };

  if (!show) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {confettiPieces.current.map(renderConfettiPiece)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  confettiPiece: {
    position: 'absolute',
    width: 8,
    height: 8,
  },
  circle: {
    borderRadius: 4,
  },
  square: {
    borderRadius: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
