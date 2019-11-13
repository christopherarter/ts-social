
/**
 * This class is meant to be extended
 * for a particular given resource.
 */
export default class Policy {

    /**
     * Determine if one model
     * has author relationship with other.
     */
    public static profileOwns = (resource: any, profile: any) : boolean => {
        return (resource.profile_id 
            == profile.id);
    }

    /**
     * Handle the canCreate check
     */
    public static profileCanCreate = (resource: any) : boolean => {
        return true;
    }

    /**
     * Handle the canView check
     */
    public static profileCanView = (resource: any, profile: any) : boolean => {
        return (resource.profile_id == profile.id);
    }

    /**
     * Handle the canEdit check
     */
    public static profileCanEdit = (resource: any, profile: any) : boolean => {
        return (resource.profile_id == profile.id);
    }

    /**
     * Handle the canDelete check
     */
    public static profileCanDelete = (resource: any, profile: any) => {
        return Policy.profileOwns(resource, profile);
    }
}