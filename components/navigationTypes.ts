// navigationTypes.ts
import { StackNavigationProp } from '@react-navigation/stack';

export type AdminStackParamList = {
  AdminPosts: undefined;
  PostDetailScreen: { post: any };
};

export type AdminStackNavigationProp = StackNavigationProp<AdminStackParamList>;
