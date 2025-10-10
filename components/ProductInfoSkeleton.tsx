import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Shimmer component for animated loading effect
function ShimmerView({ style }: { style: any }) {
    const shimmerAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const shimmer = () => {
            Animated.sequence([
                Animated.timing(shimmerAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => shimmer());
        };
        shimmer();
    }, [shimmerAnimation]);

    const opacity = shimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <Animated.View style={[style, { opacity }]} />
    );
}

export default function ProductInfoSkeleton() {
    return (
        <>
            <LinearGradient
                colors={['#fbf7ee', '#e9daa9']}
                style={styles.background}
            />
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.productInfoContainer}>
                        {/* UPC Number skeleton */}
                        <ShimmerView style={styles.upcSkeleton} />
                        
                        {/* Brand and Product Name skeleton */}
                        <View>
                            <ShimmerView style={styles.brandSkeleton} />
                            <ShimmerView style={styles.productNameSkeleton} />
                        </View>
                        
                        {/* Serving Size skeleton */}
                        <View style={styles.horizontalInfoContainer}>
                            <ShimmerView style={styles.horizontalInfoLabelSkeleton} />
                            <ShimmerView style={styles.horizontalInfoValueSkeleton} />
                        </View>
                        
                        {/* Data Boxes skeleton */}
                        <View style={styles.dataBoxContainer}>
                            <SkeletonDataBox />
                            <SkeletonDataBox />
                            <SkeletonDataBox />
                            <SkeletonDataBox />
                        </View>
                        
                        {/* Top Vitamins skeleton */}
                        <View>
                            <ShimmerView style={styles.brandSkeleton} />
                            <View style={styles.vitaminsContainer}>
                                <SkeletonVitaminItem />
                                <SkeletonVitaminItem />
                                <SkeletonVitaminItem />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

function SkeletonDataBox() {
    return (
        <View style={styles.boxContainer}>
            <View style={styles.boxContents}>
                <View style={styles.header}>
                    <ShimmerView style={styles.iconSkeleton} />
                    <ShimmerView style={styles.labelSkeleton} />
                </View>
                <View style={styles.amountContainer}>
                    <ShimmerView style={styles.amountSkeleton} />
                    <ShimmerView style={styles.dailyValueSkeleton} />
                </View>
            </View>
        </View>
    );
}

function SkeletonVitaminItem() {
    return (
        <View style={styles.horizontalInfoContainer}>
            <ShimmerView style={styles.horizontalInfoLabelSkeleton} />
            <View style={styles.horizontalInfoDataSkeleton}>
                <ShimmerView style={styles.horizontalInfoValueSkeleton} />
                <ShimmerView style={styles.dailyValueSkeleton} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    productInfoContainer: {
        gap: 30,
        padding: 20,
    },
    upcSkeleton: {
        height: 11,
        width: 80,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 4,
        alignSelf: 'flex-end',
    },
    brandSkeleton: {
        height: 12,
        width: 120,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 4,
        marginBottom: 8,
    },
    productNameSkeleton: {
        height: 24,
        width: '80%',
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 4,
    },
    horizontalInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffffaa',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderRadius: 20,
    },
    horizontalInfoLabelSkeleton: {
        height: 14,
        width: 100,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 4,
    },
    horizontalInfoValueSkeleton: {
        height: 16,
        width: 60,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 4,
    },
    horizontalInfoDataSkeleton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    dataBoxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: -5,
        marginRight: -5,
    },
    boxContainer: {
        padding: 5,
        width: '50%',
        maxWidth: '50%',
    },
    boxContents: {
        gap: 6,
        backgroundColor: '#ffffffaa',
        paddingLeft: 13,
        paddingRight: 13,
        paddingTop: 13,
        paddingBottom: 18,
        borderRadius: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8,
        alignItems: 'center',
    },
    iconSkeleton: {
        width: 34,
        height: 34,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 17,
    },
    labelSkeleton: {
        height: 13,
        width: 80,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 4,
    },
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    amountSkeleton: {
        height: 34,
        width: 60,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 4,
    },
    dailyValueSkeleton: {
        height: 14,
        width: 40,
        backgroundColor: 'rgb(222 206 124)',
        borderRadius: 12,
    },
    vitaminsContainer: {
        gap: 10,
        marginTop: 10,
    },
});
