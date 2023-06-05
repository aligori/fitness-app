import useHasPermission from '@hooks/useHasPermission';

const PermissionHandler = ({ permission, children }) => {
  const canAccess = useHasPermission(permission);
  if (!canAccess) {
    return null;
  }
  return children;
};
export default PermissionHandler;
